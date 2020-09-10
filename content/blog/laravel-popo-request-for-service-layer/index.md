---
title: Laravel 서비스 클래스에서 POPO 인자 사용하기

date: '2020-09-10'
description: Laravel 서비스 클래스에서 Illuminate\Http\Request 인자 사용은 그만! Plain Old PHP Object로 사용하는 방법을 소개합니다.
tags: ['laravel', 'php', 'service']
cover: './cover.jpg'
draft: false
---

해당 글은 MVCS 패턴에 대해 이미 알고 계신다는 전제 하에 작성되었습니다.

## 흔히 찾아볼 수 있는 예제
라라벨 서비스 계층에 대해 예제들을 찾아보면, 보통 아래와 같이 `Illuminate\Http\Request` 클래스를 그대로 인자로 사용하는 경우가 많더군요.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Http\Requests\PostRequest;
use App\Services\PostService;

class PostController 
{ 
	protected $postservice;

	public function __construct(PostService $postservice)
	{
		$this->postservice = $postservice;
	}
    public function index(){
       
    $posts = $this->postservice->index();
     
    return view('index', compact('posts'));
    }

    public function create(PostRequest $request)
    {
      
      $this->postservice->create($request);

      return back()->with(['status'=>'Post created successfully']);
    }
}
```

```php
<?php

namespace App\Services;

use App\Post;
use App\Repositories\PostRepository;
use Illuminate\Http\Request;

class PostService
{
	public function __construct(PostRepository $post)
	{
		$this->post = $post ;
	}

	public function index()
	{
		return $this->post->all();
	}

    public function create(Request $request)
	{
        $attributes = $request->all();
         
        return $this->post->create($attributes);
	}
}
```

일반적으로 계층간 이동은 DTO(Data transfer object)를 통해 이뤄지는데, 
`Illuminate\Http\Request` 클래스가 예제에서 DTO를 겸하고 있다고 볼 수 있습니다. 여기서 무엇이 잘못되었는지 아시겠나요?

![layered architecture overview](./layers.jpg)
<p style="text-align: center; margin-bottom: 2rem;"><sub>출저: http://dddsample.sourceforge.net/architecture.html</sub></p>

일반적으로 계층화 아키텍쳐에선 하위 영역에서 상위 영역에 대해 알지 못해야 합니다. 
하지만, 예제 속에선 `Illuminate\Http\Request` 클래스는 HTTP에 의존적이기 때문에 상위 영역이 무엇인지 알게 되는 문제가 있습니다. 
***MVCS인데 알아도 되는 거 아닌가?*** 하실 수 있지만, 
서비스는 프로젝트 스타일에 따라 애플리케이션이나 도메인 계층을, 컨트롤러는 인터페이스 계층에 해당합니다. 
여기서 인터페이스 계층은 사용자가 애플리케이션과 상호 작용 할 수 있는 모든 작업을 담당하기 떄문에 HTTP나 CLI, 혹은 그 외에 다른 무엇인가 일 수 있습니다. 
바로 이해가 가시나요? 
계층간 이동에 대한 접근을 컨트롤러에서 서비스로 이동하는 것이 아니라, 인터페이스 계층에서 애플리케이션 계층으로 이동하는 것으로 이해하셔야 합니다.

## Plain Old PHP Object(POPO)로 DTO 다시 작성하기
저는 그래서 DTO를 POPO로 작성합니다. 
기본 배열을 인자로 사용하는 것도 방법이지만, 배열 안에 정확히 무슨 값이 필요한지 유추하기 어렵기 때문에 선호하지 않습니다.

```php
<?php

declare(strict_types=1);

namespace App\Requests;

/**
 * Class ExampleRequest
 */
class ExampleRequest
{
    /**
     * @var int
     */
    private int $num;

    /**
     * @var string
     */
    private string $text;

    /**
     * ExampleRequest constructor.
     * @param int $num
     * @param string $text
     */
    public function __construct(int $num, string $text)
    {
        $this->num = $num;
        $this->text = $text;
    }

    /**
     * @return int
     */
    public function getNum(): int
    {
        return $this->num;
    }

    /**
     * @return string
     */
    public function getText(): string
    {
        return $this->text;
    }
}
```

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Requests\ExampleRequest;
use App\Http\Requests\ExampleRequest as Request;
use App\Services\ExampleService;
use Illuminate\Http\Response;

/**
 * Class ExampleController
 * @package App\Http\Controllers
 */
class ExampleController extends Controller
{
    /**
     * @var ExampleService
     */
    private ExampleService $service;

    /**
     * ExampleController constructor.
     * @param ExampleService $service
     */
    public function __construct(ExampleService $service)
    {
        $this->service = $service;
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function __invoke(Request $request): Response
    {
        $this->service->run(new ExampleRequest($request->get('num'), $request->get('text')));

        return response()->noContent();
    }
}
```

```php
<?php

declare(strict_types=1);

namespace App\Services;

use App\Requests\ExampleRequest;

/**
 * Class ExampleService
 */
class ExampleService
{
    /**
     * @param ExampleRequest $request
     */
    public function run(ExampleRequest $request): void
    {
        // do something...
    }
}
```

POPO로 작성한 것까지는 좋았습니다만, 곧바로 새로운 고민이 생기게 됩니다. 
위 예제처럼 되게 간단한 케이스에선 별 문제가 되지 않지만, DTO에 필요한 필드가 굉장히 많을 경우에 매핑하는 과정이 굉장히 번거로운 작업이 됩니다. 
저도 사실 이 부분 때문에, 구현의 편의성을 위해 서비스에서  `Illuminate\Http\Request`를 사용하고 있었습니다. 
하지만, 역시 마음 속 한 구석에 불편함이 계속 느껴져 매핑을 스프링의 `@RequestBody`처럼 편리하게 해주는 방법이 없을까 찾아보던 중 
`netresearch/jsonmapper` 패키지를 알게 되었습니다. 해당 패키지를 사용해보니 제가 바라던 것과 유사한 수준까지 구현할 수 있더군요. 
이후에 저는 DTO를 다시 작성해서 사용하기 시작했습니다, 그러면 바로 위 예제를 해당 패키지를 사용한 방식으로 다시 작성해 보겠습니다.

```php
<?php

declare(strict_types=1);

namespace App\Factories\Requests;

use App\Requests\ExampleRequest;
use Illuminate\Http\Request;
use JsonMapper;
use JsonMapper_Exception;
use ReflectionClass;
use RuntimeException;
use Symfony\Component\HttpFoundation\ParameterBag;

/**
 * Class JsonMapperExampleRequestFactory
 * @package App\Factories\Requests
 */
class JsonMapperExampleRequestFactory implements ExampleRequestFactory
{
    /**
     * @inheritDoc
     */
    public function createFromLaravelRequest(Request $request): ExampleRequest
    {
        try {
            $mapper = new JsonMapper();
            $mapper->bIgnoreVisibility = true;

            return $mapper->map(
                new ParameterBag($request->all()),
                (new ReflectionClass(ExampleRequest::class))->newInstanceWithoutConstructor()
            );
        } catch (JsonMapper_Exception $exception) {
            throw new RuntimeException($exception->getMessage(), $exception->getCode(), $exception);
        }
    }
}
```
DTO 생성을 컨트롤러 이외에도 할 수 있기 때문에, 별도의 팩토리 클래스로 분리했습니다. 
자, 이제 파라미터가 많은 경우에 직접 매핑을 해야 할 곤혹이 사라졌습니다.

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Factories\Requests\ExampleRequestFactory;
use App\Http\Requests\ExampleRequest;
use App\Services\ExampleService;
use Illuminate\Http\Response;

/**
 * Class ExampleController
 * @package App\Http\Controllers
 */
class ExampleController extends Controller
{
    /**
     * @var ExampleService
     */
    private ExampleService $service;

    /**
     * @var ExampleRequestFactory
     */
    private ExampleRequestFactory $factory;

    /**
     * ExampleController constructor.
     * @param ExampleService $service
     * @param ExampleRequestFactory $factory
     */
    public function __construct(ExampleService $service, ExampleRequestFactory $factory)
    {
        $this->service = $service;
        $this->factory = $factory;
    }

    /**
     * @param ExampleRequest $request
     * @return Response
     */
    public function __invoke(ExampleRequest $request): Response
    {
        $this->service->run($this->factory->createFromLaravelRequest($request));

        return response()->noContent();
    }
}
```
전체 코드를 보시려면 해당 [링크](https://github.com/cr-lgl/laravel-popo-request-example)에서 확인하실 수 있습니다.

작성해야 할 코드가 기존보다 더 늘어났지만, 적절한 리팩토링과 IDE의 도움을 받으면 그렇게 와닿는 정도는 아닙니다. 
그러니, 서비스에서 POPO로 작성된 DTO를 사용해 보시는 건 어떨까요?

## 참고 링크
- https://blog.eduonix.com/web-programming-tutorials/learn-using-repositories-services-laravel-5/
- https://m.dotdev.co/design-pattern-service-layer-with-laravel-5-740ff0a7b65f
- https://herbertograca.com/2017/08/03/layered-architecture/
- https://github.com/cweiske/jsonmapper
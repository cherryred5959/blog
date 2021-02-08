---
title: Laravel에서 AOP를 적용해 횡단 관심사 분리하기

date: '2021-02-11'
description: Laravel에서 Aspect-oriented programming을 적용해 횡단 관심사를 분리하는 방법을 소개합니다.
tags: ['laravel', 'php', 'aop']
cover: './cover.jpg'
draft: true
---

AOP 개념에 대해서는 이미 잘 정리된 글들이 많기 때문에, 참고 링크로 대체합니다.

## AOP(Aspect Oriented Programming)를 적용하는 이유?
일반적으로, 라라벨에서 코드를 작성하다보면 아래처럼 신규 유저를 생성한다는 비즈니스 로직 이외에도 
트랙잭션이나 로깅처럼 공통적인 기능에 대한 코드가 여러 클래스에서 사용되게 됩니다.

```php
class DirtyCreateUserService implements CreateUserService
{
    /* ... */

    public function run(string $email, string $password): void
    {
        DB::transaction(function () use ($email, $password) {
            $user = new User();
            $user->setAttribute('email', $email);
            $user->setAttribute('password', $this->hasher->make($password));
            $user->save();
        });

        Log::info("Created User: {$email}");
    }
    
    /* ... */
}
```

개발 초기엔 무시할 정도겠지만, 시간이 지남에 따라 인증, 보안과 같은 추가적인 횡단 관심사(Cross-Cutting Concerns)들이 점점 늘어나고,
여러 곳에서 같은 코드가 중복될 겁니다.

![cross-cutting concerns overview](./cross-cutting.png)
<p style="text-align: center; margin-bottom: 2rem;"><sub>출저: https://developers.shopware.com/blog/2015/07/23/cross-cutting-concerns/</sub></p>

때문에 위에 예시로 들었던 `DirtyCreateUserService` 클래스 같은 스타일로 코드를 계속해서 작성하다 보면 __비즈니스 로직에 대한 코드__와
__공통적인 기능에 대한 코드__가 섞여 코드 가독성이 떨어지고, 공통 부분에 변동사항이 생겼을 때 코드를 변경하기 어려워집니다.
결과적으로, 이러한 스타일은 __Don't Repeat Yourself__와 __SOLID 원칙 중에 Single Responsibility__를 따르지 않는 코드를 양산하여 
유지보수를 어렵게 만듭니다.

지금부터, 어떻게 AOP를 적용해 위에 문제들을 해결하는지 알아보도록 하겠습니다.

## 이미 라라벨에서 AOP가 적용된 곳을 찾아볼 수 있다?

## 라라벨 파이프라인을 활용한 구현

## 또 다른 선택지, Go! AOP

## 참고 링크
- http://go.aopphp.com/docs/introduction/
- https://www.infoworld.com/article/3040557/my-two-cents-on-aspect-oriented-programming.html#:~:text=AOP%20(aspect%2Doriented%20programming),to%20be%20adaptable%20to%20changes.
- https://medium.com/@ivastly/application-instrumentation-with-aspect-oriented-programming-in-php-18b1defa682

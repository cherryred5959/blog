---
title: Docker for Mac 속도 개선하기

date: '2020-08-12'
description: Docker for Mac 환경에서 개발할 때 마주치는 성능 문제를 개선하는 방법을 소개합니다.
tags: ['docker', 'mac', 'mutagen']
cover: './cover.jpg'
draft: false
---

해당 글은 도커에 대한 경험이 어느정도 있다고 가정하고 작성했습니다.

## 무엇이 문제인가?
저는 가급적이면 호스트에 뭔가를 설치하는 걸 좋아하지 않기 때문에, 가급적이면 Docker for Mac을 통해 컨테이너 환경 기반에서 개발하는 것을 선호합니다.
하지만, 치명적인 문제가 있는데 호스트에서 볼륨 마운트를 사용 중인 컨테이너의 어플리케이션에 접근하는 것이 [굉장히 느리다](https://github.com/docker/for-mac/issues/3497)는 겁니다.
해당 문제가 생산성이 굉장히 떨어진다고 느껴 차라리 VM(Virtual machine)이나, 호스트에 직접 설치해서 환경 구성하는 게 나을 거 같단 생각도 했었지만,
개인적으로 OS를 여럿 사용하여 개발 환경을 컨테이너 기반으로 통일화하고 싶다는 니즈가 더 커 해결 방법을 찾아 봤습니다.

## 찾아본 해결방법

### Docker-sync
[Docker-sync](http://docker-sync.io/)는 이전에 [Laradock](https://laradock.io/) 프로젝트를 뜯어 보다 존재를 알게 되어 제일 처음에 고려를 했었습니다.
해당 툴은 직접 사용해 보지는 않았으나, 새로운 써드파티를 학습해야 한다는 거부감과 아래 소개할 뮤타젠과 성능 비교 글을 보고서 채택하지 않았습니다.

### Bind mount(cached OR delegated)
도커에서 볼륨 마운트는 기본적으로 `consistent` 모드로 동작을 하는데, 이를 사용자에 환경에 따라 `cached`나 `delegated`로 변경하는 선택지입니다.
기본 동작 모드보단 나은 수준이지만, 해당 방법으론 만족할만한 성능 향상을 느끼지 못해서 채택하지 않았습니다.

### Mutagen
결론적으로, 저는 [Mutagen](https://mutagen.io/)을 채택했습니다. 위에 도커 싱크처럼 써드파티를 새로 배워야 한다는 건 똑같지만, 볼륨 마운트를 사용하지
않았을 때와 가장 근접한 퍼포먼스를 보여주기 때문에 현실과 타협했습니다. 또, 공식 문서가 굉장히 잘 되어 있어서 당장 써먹는데 그다지 어려움을 느끼지 못했습니다.

## Docker for Mac(Edge)
이후에도 미련을 버리지 못하고, Docker for mac 볼륨 마운트와 관련된 문제가 언제 개선될지 프로젝트를 꾸준히 모니터링하고 있던 중,
`Edge` 버전에 뮤타젠이 내장된 걸 알게 되었습니다. 사용 방법은 아래 사진처럼 단순하게 디렉터리를 지정해 활성화하기만 하면 됩니다.

![docker](/images/speed-up-docker-for-mac/mac-mutagen-ready.png)

해당 옵션과 관련해서 아직 [몇몇 문제들](https://github.com/docker/for-mac/issues/1592)이 있지만, 개발 단계에선 불편함을 느낄 정도는 아닌 거 같습니다.
이제 써드파티를 새로 학습해야 하는 부담마저 없어졌기 때문에, 맥에서 도커 기반으로 개발환경을 구성하신다면 해당 기능을 꼭 이용해 보세요!

## 참고 링크
- https://docs.docker.com/storage/bind-mounts/#configure-mount-consistency-for-macos
- https://qpzm.github.io/2020/03/23/docker-sync.html
- https://blog.rocketinsights.com/speeding-up-docker-development-on-the-mac
- https://docs.docker.com/docker-for-mac/mutagen

<hr/>

> 2020-09-09 변경사항

글을 작성한지 얼마되지 않아, 새로운 프로젝트를 동기화 하려고 메뉴를 열자 뮤타젠 관련 기능이 보이지 않더군요.
원인을 찾아봤는데, [다음과 같은 이유](https://github.com/docker/for-mac/issues/1592#issuecomment-678397258)로 기능을 제거했다고 합니다.
대신에 `gRPC-FUSE` 옵션을 활성화해서 사용하라고 하더군요. 하지만, 해당 옵션을 활성화해도 뮤타젠만큼의 성능 향상이 이뤄지지 않는다고 합니다.
한동안, 해당 이슈를 지켜보면서 앞으로 어떻게 될 지 봐야 할 거 같네요. 저는 뮤타젠 동기화를 포기할 수 없어서 한동안 2.3.4 버전으로 사용할 거 같습니다.
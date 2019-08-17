# Express-GraphQL-MongoDB-boilerplate

Simple boilerplate for GraphQL practice on Express with MongoDB

GraphQL과 Express, MongoDB가 포함된 보일러플레이트

## Description

GraphQL과 MongoDB를 사용하는 Express 웹서버입니다.

사용전에 MongoDB연결을 위해 config.json를 수정해주세요.

로컬환경에서만 테스트를 원하시는 경우 config.json을 삭제하시고, mongoose/models.js 파일을 직접 수정해서 사용하시면 됩니다.

config.json의 각각의 값은 아래의 mongodb 엑세스 주소값에 대응하여 입력해주세요.

``` bash
mongodb://<dbuser>:<dbpassword>@<uri>
```

코드는 아래의 글을 참조해서 만들었습니다.

참조링크: [expressgraphql에-mongodb-사용하기](https://yuddomack.tistory.com/entry/expressgraphql%EC%97%90-mongodb-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

* * *

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:4000
npm run dev
```

## GraphiQL

GraphQL을 테스트해보기 위해선 [localhost:4000/graphql](localhost:4000/graphql) 로 이동합니다.

### 사용자 추가

localhost:4000/grapqhql에 들어가신 후 좌측 상단 박스에 아래의 코드를 입력해주세요.
~~~
mutation($email: String!, $pwd: String!){
  createUser(email:$email, pwd: $pwd) {
    id
    email
    pwd
  }
}
~~~

좌측 하단의 Query Variables를 누르고 다음의 코드를 추가하여 사용자를 추가합니다.
~~~
{
  "email": "awesome@gmail.com",
  "pwd": "mypassword"
}
~~~

### 사용자 조회

사용자 전체를 조회할 때 아래와 같이 할 수 있습니다.
~~~
 {
   	users {
      email
    }
  }
~~~

### 포스트 추가

포스트 작성 역시 mutation을 활용해서 진행합니다. 차이점은 author 변수가 일반적인 String이 아닌 mongodb의 ObjectId 값을 가져옵니다.(아무 String값을 넣으면 DB에는 저장되지만 데이터를 제대로 리턴하지 못합니다.) 그렇기 때문에 포스트를 추가하기 위해선 임의의 사용자의 ObjectId를 입력해야합니다.
~~~
mutation($title: String!, $content: String!, $author: String!) {
  createPost(title:$title, content:$content, author: $author) {
    content
  }
}
~~~

Query Variables 부분

~~~
{
  "title": "GraphQL과 Express",
  "content": "Mongodb를 함께 사용해보세요.",
  "author": "5d5799ec5c4ecd3a089c7e8b"
}
~~~
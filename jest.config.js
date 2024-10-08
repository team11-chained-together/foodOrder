export default {
    transform: {},
    testEnvironment: 'node',  // 노드 환경에서 실행
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  };
//   // bcrypt mocking할 때
// Jest 는 기본적으로 commonJS를 사용하는데 ES6 모듈과 차이가 발생해서 jest.config.js 파일을 생성해서 module resolution을 설정했습니다.  
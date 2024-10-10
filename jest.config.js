export default {
  // 해당 패턴에 일치하는 경로가 존재할 경우 테스트를 하지 않고 넘어갑니다.
  testPathIgnorePatterns: ['/node_modules/'],
  // 테스트 실행 시 각 TestCase에 대한 출력을 해줍니다.
  verbose: true,

  //   // bcrypt mocking할 때
  // Jest 는 기본적으로 commonJS를 사용하는데 ES6 모듈과 차이가 발생해서 jest.config.js 파일을 생성해서 module resolution을 설정했습니다.
  transform: {},
  testEnvironment: 'node', // 노드 환경에서 실행
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
};

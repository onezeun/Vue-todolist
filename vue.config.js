const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    // 프리캐시할 파일 지정 : 사용자 장치에 저장해둘 파일 (인터넷이 종료되더라도 기본적으로 보여질 파일들)
    include: [/^index|.html$/,/.css$/,/.js$/,/^manifest|.json$/,/.png$/],
    // exclude는 제거할 파일이 없어도 반드시 작성해야 제대로 동작함
    exclude: []
  }
})
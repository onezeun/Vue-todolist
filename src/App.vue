<template>
  <v-app>
    <!-- 전체영역을 카드 UI로 변경하여 색상의 일관성 유지 -->
    <v-card>
      <v-app-bar color="white">
        <!-- 좌측에 메뉴 아이콘 추가 -->
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>To Do List</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-row my-5>
            <v-col cols="8" offset="1">
              <!-- 실행되자마자 입력포커스를 가지도록 autofocus 설정 -->
              <v-text-field label="할 일" autofocus v-model="sTodoTitle" color="black" >
              </v-text-field>
            </v-col>
            <v-col cols="2" my-2 class="align-self-center">
              <v-btn fab max-height="30px" max-width="30px" color="black" dark @click="fnSubmitTodo()">
                <v-icon>add</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-list two-line v-for="item in oTodos" :key="item.key">
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-card>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

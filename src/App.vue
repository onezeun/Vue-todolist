<template>
  <v-app>
    <!-- 전체영역을 카드 UI로 변경하여 색상의 일관성 유지 -->
    <v-card>
      <v-app-bar color="white">
        <!-- 좌측에 메뉴 아이콘 추가 -->
        <img src="./assets/logo.png" alt="투두리스트" style="width: 30px; height:30px; margin-right: 20px;" />
        <v-toolbar-title>To Do List</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-row my-5 style="justify-content: center;">
            <v-col cols="8" offset="1">
              <!-- 실행되자마자 입력포커스를 가지도록 autofocus 설정 -->
              <v-text-field label="할 일" autofocus v-model="sTodoTitle" color="black">
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
                <!-- item.b_edit 값을 통해 읽기 모드인 경우만 표시 -->
                <v-card flat outlined color="lighten-3" v-if="!item.b_edit">
                  <!-- 항목을 하나씩 가져와서 tile 단위로 표시 -->
                  <v-list-item class="py-2">
                    <v-list-item-action>
                      <!-- 체크박스 표시하고 선택되면 변경 상태 DB에 저장 -->
                      <v-checkbox color="black" v-model="item.b_completed"
                        @change="fnCheckboxChange(item)"></v-checkbox>
                    </v-list-item-action>
                    <!-- 제목을 표시하고 체크하면 취소선 표시 -->
                    <v-list-item-content class="d-flex justify-space-between">
                      <v-list-item-title :class="{ style_completed: item.b_completed }" style="flex:none">
                        {{ item.todo_title }}
                      </v-list-item-title>
                      <v-list-item-subtitle style="flex:none">
                        <!-- 수정 아이콘 표시하고 클릭하면 수정 모드로 변경 -->
                        <v-icon class="pointer" @click="fnSetEditTodo(item['.key'])">create</v-icon>
                        <!-- 삭제 아이콘 표시하고 클릭하면 해당 item 삭제 -->
                        <v-icon class="pointer" @click="fnRemoveTodo(item['.key'])">delete</v-icon>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
                <!-- item.b_edit 값을 통해 수정 모드인 경우 어둡게 표시 -->
                <v-card v-else dark>
                  <v-list-item class="py-2">
                    <v-list-item-action>
                      <v-checkbox v-model="item.b_completed"></v-checkbox>
                    </v-list-item-action>
                    <!-- v-list-item 안에서 텍스트 입력과 버튼 사용을 위해 v-card 엘리먼트 사용 -->
                    <v-card-text style="padding: 0">
                      <!-- 포커스를 입력창으로 이동 후 삭제 아이콘 추가 -->
                      <v-text-field autofocus clearable v-model="item.todo_title"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <!-- 수정모드에서 '저장' 아이콘 클릭하면 해당 item 저장 -->
                      <v-icon class="pointer" @click="fnSaveEdit(item)">save</v-icon>
                      <!-- 수정모드에서 '취소' 아이콘 클릭하면 읽기모드로 변경 -->
                      <v-icon class="pointer" @click="fnCancelEdit(item['.key'])">cancel</v-icon>
                    </v-card-actions>
                  </v-list-item>
                </v-card>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-card>
  </v-app>
</template>

<script>
// 파이어베이스 DB 가져옴
import { oTodosinDB } from '@/datasources/firebase'

export default {
  name: 'App',
  data() {
    return {
      oTodos: [], // 할 일 데이터 목록 저장 변수
      sTodoTitle: '' // 할 일 제목 저장 문자열 변수
    }
  },
  // 파이어베이스를 쉽게 사용하도록 oTodos 변수로 변경
  firebase: {
    oTodos: oTodosinDB
  },
  methods: {
    // 할 일 제목, 완료, 수정 모드 상태값을 DB에 저장
    fnSubmitTodo() {
      oTodosinDB.push({
        todo_title: this.sTodoTitle,
        b_completed: false,
        b_edit: false
      })
      this.sTodoTitle = ''
    },
    // 전달된 할 일을 DB에서 제거
    fnRemoveTodo(pKey) {
      oTodosinDB.child(pKey).remove()
    },
    // 전달된 할 일의 b_edit를 수정모드로 변경
    fnSetEditTodo(pKey) {
      oTodosinDB.child(pKey).update({
        b_edit: true
      })
    },
    // 전달된 할 일의 b_edit를 읽기 모드로 변경
    fnCancelEdit(pKey) {
      oTodosinDB.child(pKey).update({
        b_edit: false
      })
    },
    // 전달된 할 일의 수정값을 DB에 저장
    fnSaveEdit(pItem) {
      const sKey = pItem['.key']
      oTodosinDB.child(sKey).set({
        todo_title: pItem.todo_title,
        b_completed: pItem.b_completed,
        b_edit: false
      })
    },
    // 체크박스 선택되면 DB에 b_completed 변경 값 저장
    fnCheckboxChange(pItem) {
      const sKey = pItem['.key']
      oTodosinDB.child(sKey).update({
        b_completed: pItem.b_completed
      })
    }
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}

.style_completed {
  text-decoration: line-through;
  color: grey;
}
</style>
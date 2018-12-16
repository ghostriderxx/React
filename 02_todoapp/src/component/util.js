// todoId 生成器
let todoId = 0;

export function genTodoId() {
    return todoId++;
}

export const VISIBILITY_FILETER_TYPES = [
    'SHOW_ALL',
    'SHOW_ACTIVE',
    'SHOW_COMPLETED'
];

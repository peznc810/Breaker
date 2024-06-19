declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// TODO: 要去官方文件找引入的 Type
declare module '*.json' {
  const value: any;
  export default value;
}

// TODO: 要去官方文件找引入的 Type
declare module '*.ts' {
  const value: any;
  export default value;
}
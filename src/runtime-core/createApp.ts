import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 先vnode
      // component -> vnode
      // 基于虚拟节点vnode做逻辑处理
      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    },
  };
}

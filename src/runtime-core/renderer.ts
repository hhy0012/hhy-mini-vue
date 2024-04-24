import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, rootContainer) {
  patch(vnode, rootContainer);
}

function patch(vnode, container) {
  // 处理组件
  processComponent(vnode, container);
}

function processComponent(vnode, container) {
  // 组件挂载
  mountComponent(vnode, container);
}

function mountComponent(vnode, container) {
  // 组件实例
  const instance = createComponentInstance(vnode);
  // 处理setup函数，得到instance.render()
  setupComponent(instance);
  // renderEffect
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render();

  // vnode -> patch
  // vnode -> element -> mountElement
  patch(subTree, container)
}
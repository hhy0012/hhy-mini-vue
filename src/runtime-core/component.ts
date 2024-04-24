export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
  };

  return component;
}

export function setupComponent(instance) {
  // TODO
  // initProps()
  // initSlots()
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance) {
  const Component = instance.type

  const { setup } = Component;
  // TODO
  // 1. 代理组件实例
  //    instance.proxy = new Proxy(instance.ctx)
  // 2. 执行setup函数
  if (setup) {
    const setupResult = setup();
  // 3. 处理setup函数返回值
    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult) {
  // 返回值可能是object 或 function
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }
  // 设置render函数
  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  const Component = instance.type;
  if (Component.render) {
    instance.render = Component.render;
  }
}

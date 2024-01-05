import type { FolderApi, FolderParams } from 'tweakpane'
import { Pane } from 'tweakpane'
import * as TweakpaneRotationInputPlugin from '@0b5vr/tweakpane-plugin-rotation'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import type { AnimationOptionsWithOverrides, Variant } from '@motionone/dom'

export function usePane(
  fn?: {
    onInit?: (pane: FolderApi) => void
    onAnimate?: (pane: FolderApi) => void
    onTransition?: (pane: FolderApi) => void
    middleware?: (folders: {
      animationPane: FolderApi
      initialPane: FolderApi
      transitionPane: FolderApi
    }, pane: Pane) => void
  },
  folder?: {
    initial?: Partial<FolderParams>
    animate?: Partial<FolderParams>
    transition?: Partial<FolderParams>
  },
) {
  const paneRef = ref<HTMLElement>()

  let transitionValue: AnimationOptionsWithOverrides = reactive({
  })

  let init: Variant = reactive({

  })

  let animate: Variant = reactive({

  })

  const reset = () => {
    init = {
      x: 0,
    }
    animate = {
      x: 0,
    }
    transitionValue = {}
  }

  onMounted(async () => {
    const pane = new Pane({ container: paneRef.value, title: 'Motion One Settings' })
    pane.registerPlugin(TweakpaneRotationInputPlugin)
    pane.registerPlugin(EssentialsPlugin)

    const initialPane = pane.addFolder({ title: 'Initial', index: 0, ...folder?.initial })
    const animationPane = pane.addFolder({ title: 'Animation', index: 1, ...folder?.animate })
    const transitionPane = pane.addFolder({ title: 'Transition', index: 2, ...folder?.transition })

    if (fn?.onInit)
      fn.onInit(initialPane)

    if (fn?.onAnimate)
      fn.onAnimate(animationPane)

    if (fn?.onTransition)
      fn.onTransition(transitionPane)

    if (fn?.middleware)
      fn.middleware({ animationPane, initialPane, transitionPane }, pane)

    if (!fn?.onInit) {
      // init
    }

    if (!fn?.onAnimate) {
      // init
    }

    if (!fn?.onTransition) {
      // init
      // transitionPane.addBlade({
      //   view: 'cubicbezier',
      //   value: [0.5, 0, 0.5, 1],
      //   expanded: true,
      //   label: 'cubicbezier',
      //   picker: 'inline',
      // }).on('change', (ev) => {
      //   console.log(ev.value.comps_)
      //   transitionValue.easing = ev.value.comps_
      // })
    }

    pane.addButton({
      title: 'Reset',
    }).on('click', () => {
      reset()
    })
  })

  return {
    paneRef,
    animate,
    init,
    transitionValue,
  }
}

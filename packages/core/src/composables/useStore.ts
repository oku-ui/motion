import type { InjectionKey } from 'vue'
import type { AnimationInstance } from '../share'

export const AnimationsKey = Symbol('animations') as InjectionKey<AnimationInstance>

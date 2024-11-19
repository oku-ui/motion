import type { ValueAnimationOptions } from 'motion/react'
import type { MotionProps } from '@/state/types'

/**
 * Generate a list of every possible transform key.
 */
export const transformPropOrder = [
  'transformPerspective',
  'x',
  'y',
  'z',
  'translateX',
  'translateY',
  'translateZ',
  'scale',
  'scaleX',
  'scaleY',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'skew',
  'skewX',
  'skewY',
]

/**
 * A quick lookup for transform props.
 */
export const transformProps = new Set(transformPropOrder)

const underDampedSpring: Partial<ValueAnimationOptions> = {
  type: 'spring',
  stiffness: 500,
  damping: 25,
  restSpeed: 10,
}

function criticallyDampedSpring(target: unknown): Partial<ValueAnimationOptions> {
  return {
    type: 'spring',
    stiffness: 550,
    damping: target === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }
}

const keyframesTransition: Partial<ValueAnimationOptions> = {
  type: 'keyframes',
  duration: 0.8,
}

/**
 * Default easing curve is a slightly shallower version of
 * the default browser easing curve.
 */
const ease: Partial<ValueAnimationOptions> = {
  type: 'keyframes',
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3,
}

export function getDefaultTransition(
  valueKey: string,
  value?: Partial<MotionProps['transition']>,
): Partial<ValueAnimationOptions> {
  // valueKey birden fazla key içerebilir, bu yüzden virgülle ayırıyoruz
  const keys = valueKey.split(',')

  // Eğer keyframes varsa ve uzunluğu 2'den büyükse, keyframesTransition kullanılır
  if (value?.times && value?.times.length > 2) {
    return keyframesTransition
  }

  // Eğer valueKey bir transformProps içerisinde geçiyorsa
  else if (keys.some(key => transformProps.has(key))) {
    // Eğer bir 'scale' key varsa, criticallyDampedSpring kullanıyoruz
    if (keys.some(key => key.startsWith('scale'))) {
      return value?.times && value?.times.length
        ? criticallyDampedSpring(value?.times[1]) // 'scale' varsa, kritik yay geçişi
        : underDampedSpring
    }
    // Aksi takdirde, genel bir yay geçişi kullanılır
    return underDampedSpring
  }

  // Diğer durumlar için varsayılan easing uygulanır
  return ease
}

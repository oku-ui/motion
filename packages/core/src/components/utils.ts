const svgElementNames = [
  // Basic shapes
  'circle', // Draws a circle.
  'ellipse', // Draws an ellipse, commonly used for ovals.
  'line', // Draws a straight line between two points.
  'polygon', // Creates a closed shape with multiple vertices.
  'polyline', // Creates a series of connected line segments.
  'rect', // Draws a rectangle with optional rounded corners.
  'path', // Defines a custom shape or path, supporting complex curves.
  'text', // Displays text within the SVG.
  'tspan', // Sub-element of <text>, used to style or position portions of text.
  'textPath', // Aligns text along a defined path.

  // Grouping and definitions
  'g', // Groups multiple SVG elements together.
  'defs', // Container for reusable definitions (e.g., gradients or symbols).
  'symbol', // Defines a reusable graphic, typically referenced with <use>.
  'use', // References and reuses a defined element or graphic.
  'desc', // Provides a description for accessibility or documentation purposes.
  'title', // Adds a title for accessibility or tooltips.

  // Filters and effects
  'filter', // Applies visual effects like blurring or lighting.
  'feBlend', // Blends multiple graphics together.
  'feColorMatrix', // Applies color transformations using a matrix.
  'feComponentTransfer', // Alters individual RGBA channels.
  'feComposite', // Combines images or graphics.
  'feConvolveMatrix', // Applies a custom kernel-based filter.
  'feDiffuseLighting', // Simulates diffuse lighting effects.
  'feDisplacementMap', // Warps an image or graphic using a displacement map.
  'feDropShadow', // Adds drop shadow effects.
  'feFlood', // Fills the canvas or graphic with a solid color.
  'feGaussianBlur', // Blurs the graphic using a Gaussian function.
  'feImage', // Renders an external image in an SVG context.
  'feMerge', // Combines multiple filter results.
  'feMorphology', // Erodes or dilates the edges of a shape.
  'feOffset', // Shifts graphics by a specified distance.
  'feSpecularLighting', // Simulates shiny lighting effects.
  'feTile', // Repeats graphics in a tiled pattern.
  'feTurbulence', // Adds texture or noise for a natural effect.

  // Animation
  'animate', // Animates a property over time.
  'animateMotion', // Moves an element along a defined path.
  'animateTransform', // Animates transformation properties like scale or rotate.
  'set', // Sets a property for a specific duration.

  // Masks and clipping paths
  'mask', // Creates a mask to hide or reveal portions of graphics.
  'clipPath', // Defines a clipping region to restrict rendering.

  // Gradients and painting
  'linearGradient', // Defines a linear gradient for fills or strokes.
  'radialGradient', // Defines a radial gradient for fills or strokes.
  'stop', // Specifies a color stop in a gradient.
  'pattern', // Defines a repeating pattern.

  // Additional elements
  'foreignObject', // Embeds non-SVG content (like HTML) within SVG.
  'style', // Embeds CSS styles for SVG elements.
  'script', // Embeds or links JavaScript code within SVG.
] as const

export type SvgElementName = typeof svgElementNames[number]

export function isSvgElementName(tag: string): tag is SvgElementName {
  return svgElementNames.includes(tag as SvgElementName)
}

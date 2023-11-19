import { createMedia } from '@artsy/fresnel'

const ExampleAppMedia = createMedia({
  breakpoints: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 },
})

export const mediaStyles = ExampleAppMedia.createMediaStyle()

export const { Media, MediaContextProvider } = ExampleAppMedia

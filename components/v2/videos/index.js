import React, { useContext } from 'react'
import { Box, Flex } from 'blockstack-ui'
import PlayIcon from 'mdi-react/PlayCircleIcon'
import { useHover, useActive } from 'use-events'
import { Title } from '@components/v2/section'
import { transition } from '@common/theme'
import { Image } from '@components/v2/image'
import { useMedia } from '@common/hooks'
import { ModalContext } from '@components/v2/modal'
import { Video } from '@components/v2/video'

const Gradient = ({ hovered, ...rest }) => (
  <Box
    size="100%"
    background="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)"
    opacity={hovered ? 0.4 : '0.5'}
    position="absolute"
    left="0"
    right="0"
    zIndex={2}
    transition={transition}
    {...rest}
  />
)
const Solid = ({ hovered, ...rest }) => (
  <Box
    size="100%"
    bg="ink"
    opacity={hovered ? 0.05 : '0.15'}
    position="absolute"
    left="0"
    right="0"
    zIndex={2}
    transition={transition}
    {...rest}
  />
)
const Overlay = ({ hovered, ...rest }) => (
  <>
    <Gradient hovered={hovered} />
    <Solid hovered={hovered} />
  </>
)

const BottomDetails = ({ primary, subtitle, duration, ...rest }) => (
  <Flex
    width={1}
    px={6}
    pb={6}
    color="white"
    justifySelf="flex-end"
    justifyContent="space-between"
    position={primary ? 'absolute' : 'relative'}
    bottom={0}
    zIndex={3}
    {...rest}
  >
    <Box opacity={0.6}>{subtitle}</Box>
  </Flex>
)

const MainDetails = ({ primary, title, ...rest }) => {
  const [hovered, bind] = useHover()
  return (
    <Flex
      flexGrow={primary ? 1 : 'unset'}
      alignItems={primary ? 'center' : 'flex-start'}
      justifyContent="center"
      flexDirection="column"
      textAlign={'left'}
      color="white"
      position="relative"
      zIndex={3}
      width="100%"
      px={6}
      transition={transition}
      pb={4}
      {...rest}
    >
      <Box
        {...bind}
        transition={transition}
        transform={hovered ? (primary ? 'scale(1.1)' : 'scale(1.2)') : 'none'}
      >
        <PlayIcon size={primary ? 96 : 40} />
      </Box>
      <Title
        is="h4"
        color="white"
        userSelect="none"
        pt={3}
        fontSize={4}
        fontWeight="500"
      >
        {title}
      </Title>
    </Flex>
  )
}

const VideoItemWrapper = ({ primary, image, ...rest }) => {
  return (
    <Flex
      minHeight={[300, primary ? 720 : 480, primary ? 720 : 480]}
      width="100%"
      alignItems={'flex-start'}
      justifyContent={'flex-end'}
      borderRadius="8px"
      mb={5}
      position="relative"
      flexDirection="column"
      overflow="hidden"
      flexShrink={1}
      transition="1s all cubic-bezier(.19,1,.22,1)"
      style={{
        willChange: 'transform',
        textDecoration: 'none'
      }}
      {...rest}
    />
  )
}

const VideoItem = ({
  hovered,
  active,
  title,
  image,
  primary,
  subtitle,
  duration,
  video,
  href,
  ...rest
}) => {
  const { handleOpen, open } = useContext(ModalContext)
  const isYouTube = href && href.toString().includes('youtube')
  const linkProps = !isYouTube
    ? {
        href,
        is: 'a',
        target: '_href'
      }
    : {}
  return (
    <VideoItemWrapper
      cursor={hovered ? 'pointer' : 'unset'}
      transform={active ? 'scale(0.98)' : 'none'}
      primary={primary}
      onClick={isYouTube ? () => handleOpen(href) : undefined}
      {...linkProps}
      {...rest}
    >
      <MainDetails title={title} />
      <BottomDetails duration={duration} subtitle={subtitle} />
      <Overlay hovered={hovered} />
      <Box
        zIndex={1}
        position="absolute"
        left={0}
        top={0}
        width={1}
        height="100%"
        transform={hovered ? 'scale(1.03)' : 'scale(1)'}
        transition={transition}
      >
        <Image height="100%" width="100%" bgImg={image} />
      </Box>
      {video ? (
        <Video
          playing={open}
          position="absolute"
          left={0}
          top={0}
          minWidth={['125%', '125%', '100%']}
          zIndex={1}
          maxWidth="120%"
          src={video}
          poster={image}
        />
      ) : null}
    </VideoItemWrapper>
  )
}

const Videos = ({ items, video, ...rest }) => {
  const isMobile = useMedia(2)
  return (
    <>
      <Flex
        width="100%"
        flexWrap="wrap"
        justifyContent="space-between"
        {...rest}
      >
        {items.map(
          ({ title, subtitle, image, width, href, ...itemProps }, key) => {
            const [hovered, hoverBind] = useHover()
            const [active, activeBind] = useActive()
            const bind = {
              ...hoverBind,
              ...activeBind
            }
            return (
              <VideoItem
                title={title}
                subtitle={subtitle}
                image={image}
                width={width}
                href={href}
                primary={key === 0 && !isMobile}
                key={key}
                hovered={hovered}
                active={active}
                video={video}
                {...bind}
                {...itemProps}
              />
            )
          }
        )}
      </Flex>
    </>
  )
}

export { Videos }

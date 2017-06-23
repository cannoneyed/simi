import React from 'react'
import omit from 'lodash.omit'
import { createResponsiveConnect } from 'react-matchmedia-connect'

const breakpointProps = [
  'isMaxLg',
  'isMaxMd',
  'isMaxSm',
  'isMaxXs',
  'isMinXl',
  'isMinLg',
  'isMinMd',
  'isMinSm'
]
const responsiveConnect = createResponsiveConnect({
  xs: 16,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1200,
})()

export default (Component) => {
  const output = (props) => {
    const {
      isMaxLg,
      isMaxMd,
      isMaxSm,
      isMaxXs,
      isMinXl,
      isMinLg
    } = props

    const nextProps = omit(props, breakpointProps)

    let size

    if (isMaxLg && isMaxMd && isMaxSm && isMaxXs) {
      size = 'xs'
    } else if (isMaxLg && isMaxMd && isMaxSm) {
      size = 'sm'
    } else if (isMaxLg && isMaxMd) {
      size = 'md'
    } else if (isMinLg && isMaxLg) {
      size = 'lg'
    } else if (isMinXl && isMinLg) {
      size = 'xl'
    }

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
    const indexOfSize = sizes.indexOf(size)

    const lte = (test) => {
      const indexOfTest = sizes.indexOf(test)
      return indexOfSize <= indexOfTest
    }

    const lt = (test) => {
      const indexOfTest = sizes.indexOf(test)
      return indexOfSize < indexOfTest
    }

    const gte = (test) => {
      const indexOfTest = sizes.indexOf(test)
      return indexOfSize >= indexOfTest
    }

    const gt = (test) => {
      const indexOfTest = sizes.indexOf(test)
      return indexOfSize > indexOfTest
    }

    nextProps.responsive = {
      size,
      lt,
      lte,
      gt,
      gte,
      isMobile: lt('sm'),
      isTablet: lt('md') && gte('sm'),
      isDesktop: gte('md')
    }

    return <Component {...nextProps} />
  }

  return responsiveConnect(output)
}

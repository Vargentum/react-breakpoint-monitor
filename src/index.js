import React, {Component, PropTypes as PT} from 'react'
import * as u from './utils'

export default class BreakpointMonitor extends Component {
  static style = {
    query: {},
    wrapper: {}
  }
  static defaultBp = {
    xs: 320,
    sm: 480,
    md: 768,
    lg: 960
  }
  static defaultStyles = {
    backgroundColor: 'rgba(0,0,0,.5)',
    color: '#fff',
    position: 'fixed',
    top: '25px',
    right: 0,
    zIndex: 9999,
    padding: '20px',
    fontSize: '16px',
    fontFamily: 'Sans Serif',
    textTransform: 'uppercase'
  }
  static propTypes = {
    bp: PT.object.isRequired,
    overwriteDefaultBp: PT.bool,
    throttleBy: PT.number,
    style: PT.object
  }
  static defaultProps = {
    bp: {},
    overwriteDefaultBp: false,
    throttleBy: 5,
    style: {},
  }
  state = {
    currentBpLabel: '-',
    finalBp: {...BreakpointMonitor.defaultBp}
  }
  componentDidMount () {
    Promise
      .resolve(this.composeFinalBp(this.props))
      .then(this.findCurrentBpLabel)
      .then(() => {
        u.safeWindow(
          'addEventListener',
          'resize',
          u.throttle(this.findCurrentBpLabel, this.props.throttleBy)
        )
      })
  }
  componentWillUnmount () {
    u.safeWindow('removeEventListener', 'resize', this.findCurrentBpLabel)
  }
  componentWillReceiveProps (nextProps) {
    this.composeFinalBp(nextProps)
  }
  composeFinalBp({bp, overwriteDefaultBp}) {
    const finalBp = overwriteDefaultBp
      ? bp
      : Object.assign({}, BreakpointMonitor.defaultBp, bp)
    this.setState({ finalBp });
  }
  findCurrentBpLabel = () => {
    const width = this.props.__windowWidth || u.safeWindow('innerWidth')
    const currentBpLabel = u.findKey(this.state.finalBp, this.isWWW(width))
    this.setState({currentBpLabel});
  }
  // Within Window Width
  isWWW = (width) => (prevBp = 0, currentBp, nextBp = Infinity) => {
    return prevBp <= width && width < nextBp
  }
  render() {
    const {bp, overwriteDefaultBp, throttleBy, style, ...attrs} = this.props
    const style = Object.assign({}, BreakpointMonitor.defaultStyles, this.props.style)
    return (
      <div {...attrs} style={style}>
        {this.state.currentBpLabel}
      </div>
    )
  }
}




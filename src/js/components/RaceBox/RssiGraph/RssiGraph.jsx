import Dygraph from 'dygraphs'
import React from 'react'
import throttle from 'lodash/throttle'

import ChannelCollection, { frequencyToHue } from 'utils/channels'

class RssiGraph extends React.Component {
  constructor(props) {
    super(props)

    this._div = null
    this._dyraph = null

    this._data = [[0, 0, 0, 0, 0, 0, 0]]
    this._dataColors = null
    this._dataLabels = []

    this._updateDygraph = throttle(this._updateDygraph, 1000)
  }

  componentDidMount() {
    this._dygraph = new Dygraph(
      this._div,
      this._data,
      {
        labels: this._dataLabels,
        gridLineColor: 'rgb(192, 192, 192)',
        strokeWidth: 2,
        axes: {
          y: {
            axisLabelFormatter: y => `${y}%`,
          }
        },
        valueFormatter: y => `${Math.round(y)}%`,
        valueRange: [0, 100],
        yRangePad: 5,
      }
    )
  }

  componentDidUpdate() {
    if (!this.props.data || !this.props.frequencies)
      return

    const scaledData = this.props.data.map(x => x / 255 * 100)

    this._data.push([this._data.length].concat(scaledData))
    this._dataColors = this.props.frequencies.map(
      f => `hsl(${frequencyToHue(f)}, 50%, 66%)`
    )
    this._dataLabels = ['timestamp'].concat(this.props.frequencies.map(
      f => {
        const channel = ChannelCollection.findByFrequency(f)
        return `${channel.name} - ${channel.frequency}`
      }
    ))

    this._updateDygraph()
  }

  render() {
    return <div ref={(div) => { this._div = div }} style={{width: '100%'}}/>
  }

  _updateDygraph() {
    this._dygraph.updateOptions({
      file: this._data,
      colors: this._dataColors,
      labels: this._dataLabels
    })

    this._dygraph.resize()
  }
}

export default RssiGraph;

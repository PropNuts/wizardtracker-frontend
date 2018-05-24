import React from 'react'
import ContentBox from '../ContentBox/ContentBox'
import RssiGraph from './RssiGraph/RssiGraph'

import { connect } from 'react-redux'

const RaceBox = (props) => {
  return <ContentBox title='Race'>
    <button>Record</button>
    <input placeholder="Name" />
    <RssiGraph data={props.rssiFiltered} frequencies={props.frequencies}/>
  </ContentBox>
}

const mapStateToProps = (state) => state.device
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceBox)

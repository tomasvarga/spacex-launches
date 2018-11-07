import React from 'react';

const fetchDataAfterMount = Component => class FetchDataAfterMount extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { isPaginationActivated } = this.props;
    if (nextProps.isPaginationActivated !== isPaginationActivated) {
      nextProps.onToNextPage();
    }
  }

  render() {
    return <Component {...this.props} />;
  }
};

export default fetchDataAfterMount;

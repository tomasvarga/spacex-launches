import React from 'react';
import throttle from 'lodash.throttle';

const withInfinityScroll = Component => class WithInfinityScroll extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', throttle(this.onScroll, 16), false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.onScroll, 16), false);
  }

    onScroll = () => {
      const {
        data, onToNextPage, isLoading, isError,
      } = this.props;
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
        && data.length && !isLoading && !isError
      ) {
        onToNextPage();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
};

export default withInfinityScroll;

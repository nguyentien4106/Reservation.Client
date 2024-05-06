import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LoadingContext } from '../context/loading';
import Loading from '../shared/Loading';

export function LoadingProvider(props) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider
        value={{
            loading: loading,
            show: () => setLoading(true),
            hide: () => setLoading(false)
        }}>
        {loading && <Loading />}
        {props.children}
    </LoadingContext.Provider>
  );
}

LoadingProvider.propTypes = {
  children: PropTypes.node
};
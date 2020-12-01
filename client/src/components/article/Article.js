import React, { Fragment, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import './Article.css';

import Error from '../error/Error';
import ArticleContent from './article-content/ArticleContent';
import Modal from '../modal/Modal';
import { setCurrentArticle } from '../../actions/article';

const Article = ({ match, setCurrentArticle, article }) => {

  useEffect(() => {
    setCurrentArticle(match.params.type, match.params.slug);
  }, []);

  const history = useHistory();

  return (
    <div id="article-container">
      {article && article !== undefined ? (
        <Fragment>
          <h1>{article.title}</h1>
          <ArticleContent/>
          <Modal />
        </Fragment>
      ) : (
        <Error
          title="Aouch!"
          message="Looks like there's no article about this topic yet."
        />
        
      )}
      <button className="basic-button" onClick={() => history.goBack()}>Go back</button>
    </div>
  );
};

Article.propTypes = {
  // TO DO : solve it !
  // Problem : currentArticle is undefined until the useEffect call
  // currentArticle: PropTypes.object.isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.article.currentArticle,
});

export default connect(mapStateToProps, { setCurrentArticle })(Article);
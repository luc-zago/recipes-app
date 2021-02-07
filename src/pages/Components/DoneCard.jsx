import React, { useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { RecipeContext } from '../../context/RecipeContext';
import shareIcon from '../../images/shareIcon.svg';
import arrowIcon from '../../images/arrowIcon.svg';
import '../DoneRecipes.css';

function grabTop(recipe, index) {
  if (recipe.type === 'bebida') {
    return (
      <Card.Subtitle
        className="recipe-subtitle text-muted"
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${recipe.alcoholicOrNot} - ${recipe.category}` }
      </Card.Subtitle>
    );
  }
  return (
    <Card.Subtitle
      className="recipe-subtitle text-muted"
      data-testid={ `${index}-horizontal-top-text` }
    >
      { `${recipe.area} - ${recipe.category}` }
    </Card.Subtitle>);
}

const checkFavorite = (event, id) => {
  const { target } = event;
  let icon = target;
  const firstParameter = 0;
  let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!favoriteRecipes) favoriteRecipes = [];
  if (icon.className.baseVal.length === firstParameter) icon = target.parentElement;
  if (icon.className.baseVal.includes('heart')) {
    icon.className.baseVal = 'done-icon favorite';
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const recipe = doneRecipes.find((item) => item.id === id);
    const { type, area, category, alcoholicOrNot, name, image } = recipe;
    const newFavorite = {
      id: recipe.id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
    };
    favoriteRecipes.push(newFavorite);
    return localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }
  const newFavorites = favoriteRecipes.filter((item) => item.id !== id);
  icon.className.baseVal = 'done-icon heart';
  return localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
};

const clearIngredients = (type, id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let key = 'meals';
  if (type.includes('bebida')) key = 'cocktails';
  inProgressRecipes[`${key}`][`${id}`] = [];
  return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};

const sharePath1 = (
  <path
    d={ `m389.332031 160c-44.09375 0-80-35.882812-80-80s35.90625-80 80-80c44.097657
    0 80 35.882812 80 80s-35.902343 80-80 80zm0-128c-26.453125 0-48 21.523438-48
    48s21.546875 48 48 48 48-21.523438 48-48-21.546875-48-48-48zm0 0` }
  />
)

const sharePath2 = (
  <path
    d={ `m389.332031 512c-44.09375 0-80-35.882812-80-80s35.90625-80 80-80c44.097657
    0 80 35.882812 80 80s-35.902343 80-80 80zm0-128c-26.453125 0-48 21.523438-48
    48s21.546875 48 48 48 48-21.523438 48-48-21.546875-48-48-48zm0 0` }
  />
)

const sharePath3 = (
  <path
    d={ `m80 336c-44.097656 0-80-35.882812-80-80s35.902344-80 80-80 80 35.882812 80
    80-35.902344 80-80 80zm0-128c-26.453125 0-48 21.523438-48 48s21.546875 48 48 48
    48-21.523438 48-48-21.546875-48-48-48zm0 0` }
  />
)

const sharePath4 = (
  <path
    d={ `m135.703125
    240.425781c-5.570313
    0-10.988281-2.902343-13.910156-8.0625-4.375-7.679687-1.707031-17.453125
    5.972656-21.824219l197.953125-112.855468c7.65625-4.414063 17.449219-1.726563
    21.800781 5.976562 4.375 7.679688 1.707031 17.449219-5.972656
    21.824219l-197.953125 112.851563c-2.496094 1.40625-5.203125 2.089843-7.890625
    2.089843zm0 0` }
  />
)

const sharePath5 = (
  <path
    d={ `m333.632812 416.425781c-2.6875
    0-5.398437-.683593-7.894531-2.109375l-197.953125-112.855468c-7.679687-4.371094-10.34375-14.144532-5.972656-21.824219
    4.351562-7.699219 14.125-10.367188 21.804688-5.972657l197.949218
    112.851563c7.679688 4.375 10.347656 14.144531 5.976563 21.824219-2.945313
    5.183594-8.363281 8.085937-13.910157 8.085937zm0 0` }
  />
)

function DoneCard(props) {
  const { recipe, index, history } = props;
  const { id } = recipe;
  const { setShow } = useContext(RecipeContext);

  let iconClass = 'done-icon heart';

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes) {
    const isFavorite = favoriteRecipes.some((item) => item.id === id);
    if (isFavorite) iconClass = 'done-icon favorite';
  }

  return (
    <div
      className="favor-recipe-container"
      key={ index }
    >
      <div
        className="favor-image-container"
      >
        <Image
          onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          className="thumb"
          src={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
          alt="receita"
          fluid
        />
      </div>
      <div className="text-icon-container">
        <div className="text-container">
          { grabTop(recipe, index) }
          <a
            href={ `/${recipe.type}s/${recipe.id}` }
          >
            <Card.Title
              className="recipe-name"
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </Card.Title>
          </a>
          <Card.Subtitle
            className="done-date"
            data-testid={ `${index}-horizontal-done-date` }
          >
            { `Feito em: ${recipe.doneDate}` }
          </Card.Subtitle>
        </div>
        <div className="icons-container">
          <svg
            viewBox="-21 0 512 512"
            className="done-icon share"
            onClick={ () => {
              setShow(true);
              navigator.clipboard.writeText(
                `${window.location.origin}/${recipe.type}s/${recipe.id}`,
              );
            } }
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            { sharePath1 }
            { sharePath2 }
            { sharePath3 }
            { sharePath4 }
            { sharePath5 }  
          </svg>
          <svg
            className={ iconClass }
            viewBox="0 0 32 29.6"
            onClick={ (event) => checkFavorite(event, recipe.id) }
          >
            <path
              d={ `M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,
              0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
              c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z` }
            />
          </svg>
          <Link
            to={ `/${recipe.type}s/${recipe.id}/in-progress` }
            onClick={ () => clearIngredients(recipe.type, id) }
          >
            <Image
              className="done-icon arrow"
              onClick={ null }
              src={ arrowIcon }
              fluid
            />
          </Link>
        </div>
        <div className="badge-container">
          {recipe.tags.map((tag, tagindex) => (
            <Badge
              className="badge"
              data-testid={ `${index}-${tag}-horizontal-tag` }
              key={ tagindex }
              pill
              variant="secondary"
            >
              { `#${tag}` }
            </Badge>))}
        </div>
      </div>
    </div>
  );
}

DoneCard.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.objectOf().isRequired,
};

export default withRouter(DoneCard);

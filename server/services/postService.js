const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');

const constraints = {
  // Lägg till valideringsregler här
};

async function getByUser(userId) {
  try {
    const user = await db.User.findOne({ where: { id: userId } });
    const allCarts = await user.getCarts({ include: [db.Product] });
    return createResponseSuccess(allCarts.map((cart) => _formatCart(cart)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getById(id) {
  try {
    const cart = await db.Cart.findOne({
      where: { id },
      include: [
        db.User,
        db.Product
      ]
    });
    return createResponseSuccess(_formatCart(cart));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    const allCarts = await db.Cart.findAll({ include: [db.User, db.Product] });
    return createResponseSuccess(allCarts.map((cart) => _formatCart(cart)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function create(cart) {
  const invalidData = validate(cart, constraints);
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    const newCart = await db.Cart.create(cart);
    return createResponseSuccess(newCart);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function update(cart, id) {
  const invalidData = validate(cart, constraints);
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    const existingCart = await db.Cart.findOne({ where: { id } });
    if (!existingCart) {
      return createResponseError(404, 'Hittade ingen varukorg att uppdatera.');
    }
    await db.Cart.update(cart, {
      where: { id }
    });
    return createResponseMessage(200, 'Varukorgen uppdaterades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function destroy(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    await db.Cart.destroy({
      where: { id }
    });
    return createResponseMessage(200, 'Varukorgen raderades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

function _formatCart(cart) {
  const cleanCart = {
    id: cart.id,
    // Lägg till fler attribut här
  };
  return cleanCart;
}

module.exports = {
  getByUser,
  getById,
  getAll,
  create,
  update,
  destroy
};

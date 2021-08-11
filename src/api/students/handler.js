const services = require('../../services/CacheService');

const setCache = (request, respone) => {
  const key = request.body.key;
  const values = request.body.values;

  if (key == null) {
    return respone.send({
      'status': 400,
      'message': 'key is required',
    });
  }

  if (values == null) {
    return respone.send({
      'status': 400,
      'message': 'values is required',
    });
  }

  services.set(key, values)
      .then((ok) => {
        return respone.send({
          'status': 201,
          'message': ok,
        });
      })
      .catch((error) => {
        return respone({
          'status': 401,
          'message': error,
        });
      });
};

const getCache = (request, response) => {
  const key = request.body.key;

  if (key == null || key == undefined) {
    return respone.send({
      'status': 400,
      'message': 'key is required',
    });
  }

  services.get(key)
      .then((data) => {
        return response.send({
          'status': 201,
          'message': data,
        });
      })
      .catch((error) => {
        return response.send({
          'status': 401,
          'message': error,
        });
      });
};

const removeCache = (request, response) => {
  const key = request.body.key;

  if (key == null || key == undefined) {
    return respone.send({
      'status': 400,
      'message': 'key is required',
    });
  }

  services.remove(key)
      .then(ok => {
        return response.send({
          "status": 201,
          "message": ok
        })
      })
      .catch(error => {
        return response.send({
          "status": 401,
          "message": error
        })
      })
};

module.exports = {
  setCache, getCache, removeCache,
};

export async function getUserId(route) {
  // REGEX for SLUGID
  let slug = /[A-Za-z0-9_-]{8}[Q-T][A-Za-z0-9_-][CGKOSWaeimquy26-][A-Za-z0-9_-]{10}[AQgw]/;
  let uuid4 = /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/;

  let pathList = route.pathname.split('/');
  let result = '';

  pathList.forEach((path) => {
    if (uuid4.test(path)) {
      result = path;
    }
  });

  return result;
}

export async function getTenant() {
  let tenant = window.location.hostname.split('.')[0];
  return tenant;
}

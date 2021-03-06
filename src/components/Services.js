import { checkMultiple, requestMultiple, PERMISSIONS } from 'react-native-permissions';

export const AppPermissions = () => {
  console.info('Running permissions check ...')
  const requiredPermissions = [
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  ]

  checkMultiple(requiredPermissions)
  .then(statuses => {

    let ungrantedPermissions = [];

    for (let index = 0; index < requiredPermissions.length; index++) {
      const permission = requiredPermissions[index];
      const isGranted = statuses[permission] == 'granted';

      if(!isGranted)
        ungrantedPermissions.push(permission);
    }

    if(ungrantedPermissions.length > 1){
      requestMultiple(ungrantedPermissions).then((statusesrequests) => {

        for (let index = 0; index < ungrantedPermissions.length; index++) {
          const permission = ungrantedPermissions[index];
          
          console.log('permission: ', permission, statusesrequests[permission]);
        }
      });
    }
  });
};

export const SubmitMACs = async () => {
  console.log('json');
  try {
    const response = await fetch(
      'http://192.168.1.76:8000/api/cloudprnt/getbymac',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          devices: [
            '00:11:62:1e:93:d2',
            '00:11:62:1e:93:d3',
            '00:11:62:1e:93:d4',
          ],
        }),
      },
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  } finally {
  }
};

const retriveData = async () => {
  const data = await submitMACs();
  console.log(data);
};
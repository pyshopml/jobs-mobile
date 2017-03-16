import { ISignupCredentials, ILoginCredentials, IValidateToken } from './interfaces';

function authSignUpOnServer(data: ISignupCredentials): Promise<Response> {
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data),
  };

  return fetch('http://jobs.pyshop.ru/api/users/', options);
}
function reqValidateToken(data: IValidateToken) {
	const options = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(data),
	};

	return fetch('http://jobs.pyshop.ru/api/account/authtoken/validate/', options);
}
export async function validate(data : IValidateToken, done, doneFail, error) {
  try {
    const res = await reqValidateToken(data);
    const result = await res.json();
    if(res.ok){
      done(result);
    } else {
      doneFail(result)
    }
  } catch(e) {
    error(e.message);
  }
}

export async function authSignUp(data : ISignupCredentials, done, doneFail, error) {
  try {
    const res = await authSignUpOnServer(data);
	  const result = await res.json();
	  if(res.ok) {
		  done(result);
	  } else {
		  doneFail(result);
	  }
  } catch(e) {
    error(e.message);
  }
}

function authenticateOnServer(data : ILoginCredentials): Promise<Response> {
  const options = {
    headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data),
  };

  return fetch('http://jobs.pyshop.ru/api/account/login/', options);
}

export async function authenticate(data : ILoginCredentials,
                                   done: (res: any) => void,
                                   error: (msg: string) => void) {
  try {
    const res = await authenticateOnServer(data);
    if(!res.ok)
      throw new Error(res.statusText);
    done(res);
  } catch(e) {
    error(e.message);
  }
}


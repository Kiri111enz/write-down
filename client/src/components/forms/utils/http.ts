import axios from 'axios';

const submit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    await axios({
        method: form.method,
        url: form.action,
        data: new FormData(form),
        headers: { 'Content-Type': 'application/json' }
    }).then((data) => {
        alert('Success!');
        console.log(data);
    }).catch((err) => {
        if (err.response)
            alert(err.response.data);
        else
            alert(err);
    });
};

export { submit };
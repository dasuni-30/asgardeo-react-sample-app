import React, { FormEvent } from 'react';

const SecurityMethod: React.FunctionComponent<{}> = () => {
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className="App-section">
            <form onSubmit={handleSubmit}>
                <h3>Security Methods</h3>
                <p className="p-description">Secure your account by setting two factor authentication.</p>
                <table className="user-profile-table">
                <tr>
                <label>Second Factor Authentication: </label>
                <select id="dropdown">
                    <option value="option1">SMS OTP</option>
                    <option value="option2">Email OTP</option>
                    <option value="option3">TOTP</option>
                </select>
                </tr>
                <tr>
                <td colSpan={2} className='tr-padding'>
                <button type="submit">Submit</button>
                </td>
                </tr>
                </table>
            </form>
        </div>
    );
}

export default SecurityMethod;

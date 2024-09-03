import React from 'react'
import { useSelector } from 'react-redux'

const UpdatePassword = () => {
    const {loading} = useSelector( (state) => state.auth)
  return (
    <div>
    {
        loading ?  (
            <div>
                Loading....
            </div>
            ) : (
                <div>
                    <h1>Choose new Password</h1>
                    <p>Almost done. Enter your new password and youre all set.</p>
                    <form>
                        <label>
                            <p>New password<sup>*</sup></p>
                        </label>

                    </form>
                </div>
            )
    }
    </div>
  )
}

export default UpdatePassword
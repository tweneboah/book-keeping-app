import React from 'react';

const AddBook = () => {
  return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto'>
        <div className='container'>
          <h1 className='text-center'>Add Book</h1>
          <form>
            <fieldset>
              <div class='form-group'>
                <select class='custom-select'>
                  <option selected='programming'>programming</option>
                  <option value='religion'>Religion</option>
                  <option value='life'>life</option>
                  <option value='culture'>culture</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Author </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Author name'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>title</label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Book title'
                />
              </div>
              <button type='submit' className='btn btn-dark m-auto'>
                Create Book
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;

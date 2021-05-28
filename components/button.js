const Button = ({children, ...props}) => {
  return <>
    <button {...props} type="submit">{children}</button>
    <style jsx>{`
      button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      .submit > button:hover {
        border-color: #888;
      }
    `}</style>
  </>

}
export default Button

//children: lo que tiene que tener dentro de la tabla x u o min 44:00
export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? "is-selected" : ""}`;
  
    const handleClick = () => {
      updateBoard(index);
    };
    // Cuando se haga click en el div se va a ejecutar la funcion handeClick
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    );
  };
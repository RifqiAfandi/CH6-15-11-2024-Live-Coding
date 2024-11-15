function HoverButton ({ children, onSelect }) {
    // document.querySelector("button").addEventListener("click", () => {
    //     console.log("Hai FSW 2");
    // })
    
    // function ClickMeDong () {
    //     console.log("FSW 2 De Bes");
    // };

    return (
        <li>
            <button onClick={onSelect}> {children}</button>
        </li>
    );
};

export default HoverButton;
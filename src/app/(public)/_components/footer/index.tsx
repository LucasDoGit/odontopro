

export function Footer(){
    return(
        <footer className="py-6 text-center text-gray-500 text-sm md:text-base">
            <p>
                Todos os direitos reservados © {new Date().getFullYear()} - <strong 
                className="hover:text-black duration-300">@lucastimoteo</strong>
            </p>
        </footer>
    )
}
export function useScrollToSection(headerOffset = 120) {

    const scrollToSection = (id) => {
        const el = document.getElementById(id);

        if (!el) return;

        window.scrollTo({
            top: el.offsetTop - headerOffset,
            behavior: "smooth",
        });
    };

    return { scrollToSection };
}
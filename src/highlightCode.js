// Highlight keywords
const highlightObject = {
    keywords: {
        section: (token) => `<span style='color:#E5C07B'>${token}</span>`,
        header: (token) => `<span style='color:#61AFEF'>${token}</span>`,
        mark: (token) => `<span style='color:#C678DD'>${token}</span>`,
    },
    numbers: (token) => `<span style='color:#98C379'>${token}</span>`,
    default: (token) => `<span style='color:#ccc'>${token}</span>`
};
const { section, header, mark} = highlightObject.keywords;

// Highlight Code Function
export function highlightCode(input, output) {
    if (!input || !output) {
        console.error("Input or Output element not found!");
        return;
    }

    function updateHighlight() {
        const value = input.value;
        output.innerHTML = value
            .split(/\b/) 
            .map(token => {
                console.log(token)
                if (token === "section") return section(token);
                if (token === "h1" || token === "h2") return header(token);
                if (token === "mark") return mark(token);
                if (!isNaN(token)) return highlightObject.numbers(token);
                return highlightObject.default(token);
            })
            .join("");
    }

    input.addEventListener("input", updateHighlight);
    input.addEventListener("scroll", () => output.scrollTop = input.scrollTop);

    updateHighlight();
}

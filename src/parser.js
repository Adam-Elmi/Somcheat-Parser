const code = `Section
h1: Hello World
end
h2: This is my second head
end
'This is a highlighted text'
end
'''lua
	print("Hello Adam")
'''
end
Section
! This is an alert message !
end
(x) This is an error message (x)
end
!? This is a warning message !?
end
` 
const structure = [];

function parser(code) {
    if(code) {
        const sections = code.split(/\bsection\b/gi).filter(v => v !== "");
        for(let i = 0; i < sections.length; i++) {
            const lines = sections[i].split(/\bend\b/i);
            structure[`section_${i}`] = [];
            for(let j = 0; j < lines.length; j++) {
                if(lines[j].replace("\n", "").startsWith("h1:")) {
                    structure[`section_${i}`].push({
                        type: "Heading",
                        level: "1",
                        content: lines[j]
                    })
                }
                if(lines[j].replace("\n", "").startsWith("h2:")) {
                    structure[`section_${i}`].push({
                        type: "Heading",
                        level: "2",
                        content: lines[j]
                    })
                }
                if(lines[j].replace("\n", "").startsWith("'''")) {
                    structure[`section_${i}`].push({
                        type: "Code",
                        content: lines[j]
                    })
                }
                if(lines[j].replace("\n", "").startsWith("!")) {
                    structure[`section_${i}`].push({
                        type: "Alert",
                        content: lines[j]
                    })
                }
                if(lines[j].replace("\n", "").startsWith("(x)")) {
                    structure[`section_${i}`].push({
                        type: "Error",
                        content: lines[j]
                    })
                }
                if(lines[j].replace("\n", "").startsWith("!?")) {
                    structure[`section_${i}`].push({
                        type: "Warning",
                        content: lines[j]
                    })
                }
            }
        }
        return structure;
    }
}
const output = parser(code);
console.log(output);
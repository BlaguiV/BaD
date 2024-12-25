const fs = require('fs')

fs.readFile('source.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    const fragments = data.split('\n').map(line => line.trim()).filter(line => line.length > 0)

    function canConnect(a, b) {
        return a.slice(-2) === b.slice(0, 2)
    }

    function findLongestSequence(fragments) {
        let result = ''
        let used = Array(fragments.length).fill(false)

        function dfs(currentSequence, lastFragmentIndex) {
            if (currentSequence.length > result.length) {
                console.log('Нова найдовша послідовність: ', currentSequence)
                result = currentSequence
            }

            for (let i = 0; i < fragments.length; i++) {
                if (!used[i] && canConnect(fragments[lastFragmentIndex], fragments[i])) {
                    used[i] = true
                    dfs(currentSequence + fragments[i].slice(2), i)
                    used[i] = false
                }
            }
        }

        for (let i = 0; i < fragments.length; i++) {
            used[i] = true
            dfs(fragments[i], i)
            used[i] = false
        }

        return result
    }

    const longestSequence = findLongestSequence(fragments)
    console.log(longestSequence)
})

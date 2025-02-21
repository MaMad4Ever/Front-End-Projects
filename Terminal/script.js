var cmd = {
    i: {},
    fun: {
        c: function(a) {
            return document.createElement(a)
        },
        i: function(a) {
            return document.getElementById(a)
        },
        s: function(a, b) {
            return new Array((b - a) + 4).join(' ')
        }
    },
    command: [
    ['base64', 'Encode text to BASE64.'], 
    ['battery', 'Get battery status.'], 
    ['bgcolor', 'Change the background color.'], 
    ['binary', 'Convert text to Binary.'], 
    ['cls', 'Clears the screen.'], 
    ['color', 'Change the text color.'], 
    ['date', 'Get todays date.'], 
    ['echo', 'Display message on the screen.'], 
    ['fontsize', 'Change the font size.'], 
    ['hex', 'Convert text to Numeral System.'], 
    ['symbol', 'Change the symbol output.']
    ],
    index: 0,
    maxHistory: 100,
    symbol: ''
}

// Event -> Web-page focus
window.onfocus = function() {
    cmd.fun.i('output').cmd.focus()
}

// Event -> Web-page loading
window.onload = function() {
    cmd.i.h = cmd.fun.i('history')
    var a = cmd.fun.i('output')
    a.onsubmit = function() {
        echo(this.cmd.value, true)
        commandHandler(this.cmd.value.trim())
        this.cmd.value = ''
        cmd.fun.i('cmd').innerText = ''
        return false
    }
    a.cmd.focus()
    a.cmd.onblur = function() {
        setTimeout(function() {
            a.cmd.focus()
        }, 0)
    }
    a.cmd.oninput = function() {
        cmd.fun.i('cmd').innerText = this.value
        window.scrollTo(0, document.body.scrollHeight)
    }
    cmdfake()
}

// Command handler
function commandHandler(a) {
    if(a.length != 0) {
        a = a.split(' ')
        a = a.filter(Boolean)
        switch(a[0].toLowerCase()) {
            case 'base64':
                a.splice(0, 1);
                cmdBase64(a.join(' '))
                break
            case 'battery':
                cmdBattery()
                break
            case 'bgcolor':
                cmdTerminalColor(false, a)
                break
            case 'binary':
                a.splice(0, 1);
                cmdBinary(a.join(' '))
                break
            case 'cls':
                cmdCls()
                break
            case 'color':
                cmdTerminalColor(true, a)
                break
            case 'date':
                echo(new Date())
                break
            case 'echo':
                a.splice(0, 1);
                cmdEcho(a.join(' '))
                break
            case 'fontsize':
                cmdFontsize(a)
                break
            case 'help':
                cmdHelp()
                break
            case 'hex':
                a.splice(0, 1);
                cmdHex(a)
                break
            case 'symbol':
                cmdSymbol(a)
                break
            case 'fake':
                cmdfake()
                break
            default:
                echo('\'' + a[0] + '\' was not found as command.')
                break
        }
    }
}

// Output
function echo(a, b = false, b1 = false) {
    if(cmd.index > cmd.maxHistory) {
        cmd.i.h.removeChild(cmd.i.h.childNodes[0])
    }
    var c = cmd.fun.c('div')
    c.id = 'index_' + cmd.index
    if(b) {
        var d = cmd.fun.c('span')
        d.className = 'symbol'
        d.innerText = cmd.symbol
        c.appendChild(d)
    }
    var d = cmd.fun.c('span')
    d.className = 'echo'
    if(b1) {
        d.innerHTML = a
    } else {
        d.innerText = a
    }
    c.appendChild(d)
    cmd.i.h.appendChild(c)
    cmd.index++
    window.scrollTo(0, document.body.scrollHeight)
}

/*
 *    Command List
 */

// Base64 encode
function cmdBase64(a) {
    if(a.length > 0) {
        echo(btoa(encodeURIComponent(a)))
        return
    }
    echo('Usage: base64 [String... ]')
}

// Battery status
function cmdBattery() {
    try {
        navigator.getBattery().then(function(a) {
            echo('Level:       ' + (a.level * 100) + '%')
            echo('Is Charging: ' + (a.charging ? 'Yes' : 'No'))
        })
    } catch(a) {
        echo('Your web-browser does not support this method.')
    }
}

// Binary encode
function cmdBinary(a) {
    if(a.length > 0) {
        var b = ''
        for(var c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c).toString(2)
            b += ('00000000' + d).slice(-8) + ' '
        }
        echo(b)
        return
    }
    echo('Usage: binary [String... ]')
}

// Clear terminal command
function cmdCls() {
    cmd.i.h.innerHTML = ''
    cmd.index = 0
}

// Change the font size
function cmdFontsize(a) {
    if(a.length > 1) {
        a = parseInt(a[1])
        if(a != NaN) {
            document.body.style.fontSize = a + 'px'
            return
        }
    }
    echo('Usage: fontsize <int>')
}

// Display message on the screen
function cmdEcho(a) {
    echo(a)
}

// Help command
function cmdHelp() {
    var a = 0
    for(var b = 0; b < cmd.command.length; b++) {
        var c = cmd.command[b][0]
        if(c.length > a) {
            a = c.length
        }
    }
    echo('List of commands:')
    for(b = 0; b < cmd.command.length; b++) {
        c = cmd.command[b]
        echo('  ' + c[0].toUpperCase() + cmd.fun.s(c[0].length, a) + c[1])
    }
}

// Convert text to Numeral System command
function cmdHex(a) {
    if(a.length > 1) {
        var b = a[0]
        if(b > 2 && b < 37) {
            a.splice(0, 1);
            a = a.join(' ')
            var c = ''
            for(var d = 0; d < a.length; d++) {
                c += a.charCodeAt(d).toString(b) + ' '
            }
            echo(c)
            return
        }
    }
    echo('Usage: hex <int (3 - 36)> [String... ]')
    if(a[0] == '-h') {
        echo(' ')
        echo('Want to learn more? click <a href="https://code.sololearn.com/WCue37iVpE2f/?ref=app">here</a>.', false, true)
    }
}

// Change the symbol
function cmdSymbol(a) {
    if(a.length > 1) {
        cmd.symbol = a[1]
        cmd.fun.i('symbol').innerText = cmd.symbol
        return
    }
    echo('Usage: symbol <String>')
}


// Set terminal text color
function cmdTerminalColor(a, b) {
    if(b.length > 1) {
        if(a) {
            document.body.style.color = b[1]
            return
        }
        document.body.style.background = b[1]
        return
    }
    echo('Usage: ' + (a ? '' : 'bg') + 'color <color name|HEX color>')
}

// New terminal command
function cmdfake() {
    var a = document.documentElement.getAttribute('v')
    cmdFontsize(['', '13'])
    cmdSymbol(['', '>'])
    cmdTerminalColor(true, ['', '#0E0'])
    cmdTerminalColor(false, ['x', ' #000'])
    cmdCls()
    echo('Welcome to Terminal {v' + a + '}')
    echo('Type \'help\' for more info.')
    echo(' ')
}



/**
 * Classe que retorna
 * @returns {ScriptError}
 */
function ScriptError(message, line)
{
        this.Message = message;
        this.Line = line;
        
        this.trace = function()
        {
                return "Erro: " + this.Message + " na linha: " + this.Line;
        };
}
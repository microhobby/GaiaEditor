
/**
 * Declaração da Classe MproEntity
 * @returns {MproEntityRelation}
 */
function MproEntityRelation()
{
        this.superCod = 2147483647;
        MproEntity.call(this);
}

MproEntityRelation.prototype = new MproEntity();
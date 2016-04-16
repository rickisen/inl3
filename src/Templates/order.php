    <main role="main">
      <article>
          <h2>Beställ Munkar</h2>

          <p>
            Här kan du beställa Munkar du 
            vill hämta i affären vid ett specifikt tillfälle.
          </p>

          <form action="/?/api/orders/" method="post" accept-charset="utf-8">

            <fieldset id="products">
              <legend>Munkar</legend>

              <section product_index="0">
                <label>Munk:</label>
                <select name="products[0][id]">
                  <!-- Fyll i med php! -->
                </select>
                <label>Antal</label>
                <input type="number" name="products[0][ammount]" value="1">
                <span class="price">Pris:</span>
              </section>

              <div id="newProductSection"> + </div> <!-- button instead? -->
            </fieldset>

            <label for="name">Namn</label>
            <input type="text" name="name" id="name">

            <label for="deadline">Klar till</label>
            <input type="date" name="deadline" placeholder="mm/dd/yyy" id="deadline">
          
            <p id="price_total">Totalt Pris:</p>
            <p><input type="submit" value="Skicka Beställning →"></p>
          </form>
      </article>
    </main>

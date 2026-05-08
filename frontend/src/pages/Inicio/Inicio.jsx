import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import CuentaDigital from '../../components/CuentaDigital/CuentaDigital';
import EstadisticasBcr from '../../components/EstadisticasBcr/EstadisticasBcr';
import TarjetaDigital from '../../components/TarjetaDigital/TarjetaDigital';
import TarjetasFunciones from '../../components/TarjetasFunciones/TarjetasFunciones';
import ProductosInteres from '../../components/ProductosInteres/ProductosInteres';
import PiePagina from '../../components/PiePagina/PiePagina';

const Inicio = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <CuentaDigital />
      <EstadisticasBcr />
      <TarjetaDigital />
      <TarjetasFunciones />
      <ProductosInteres />
      <PiePagina />
    </main>
  );
};

export default Inicio;

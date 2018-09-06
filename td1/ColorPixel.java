/**
 * Classe de pixel en couleurs 
 * @author :
 * @date : 
 */

public class ColorPixel extends AbstractPixel
{
	public int[] rgb; // donnees de l'image
	
	/**
	 * Constructeur par defaut (pixel blanc)
	 */
	ColorPixel()
	{
		rgb = new int[3];
		rgb[0] = 255;
		rgb[1] = 255;
		rgb[2] = 255;
	}
	
	/**
	 * Assigne une valeur au pixel
	 * @param rgb: valeurs a assigner 
	 */
	ColorPixel(int[] rgb)
	{
		this.rgb = rgb;
		
	}
	
	/**
	 * Renvoie un pixel copie de type noir et blanc
	 */
	public BWPixel toBWPixel()
	{
		// compléter
		int moyenne = (rgb[0]+rgb[1]+rgb[2])/3;
		
		if(moyenne>127) {
			return new BWPixel(true);
		}
		else {
			return new BWPixel(false);
		}
		
	}
	
	/**
	 * Renvoie un pixel copie de type tons de gris
	 */
	public GrayPixel toGrayPixel()
	{
		int moyenne = (rgb[0]+rgb[1]+rgb[2])/3;
		return new GrayPixel(moyenne);
		// compléter
		
	}
	
	/**
	 * Renvoie un pixel copie de type couleurs
	 */
	public ColorPixel toColorPixel()
	{
		return new ColorPixel(this.rgb);
		
	}
	
	public TransparentPixel toTransparentPixel()
	{
		int[] rgba = {rgb[0],rgb[1],rgb[2],255};
		return new TransparentPixel(rgba);
		// compléter
		
	}
	
	/**
	 * Renvoie le negatif du pixel (255-pixel)
	 */
	public AbstractPixel Negative()
	{
		int[] rgbNeg = {255-rgb[0],255-rgb[1],255-rgb[2]};
		return new ColorPixel(rgbNeg);
		// compléter
		
	}
	
	public void setAlpha(int alpha)
	{
		//ne fait rien
	}
	
	/**
	 * Convertit le pixel en String (sert a ecrire dans un fichier 
	 * (avec un espace supplémentaire en fin)s
	 */
	public String toString()
	{
		return  ((Integer)rgb[0]).toString() + " " + 
				((Integer)rgb[1]).toString() + " " +
				((Integer)rgb[2]).toString() + " ";
	}
}
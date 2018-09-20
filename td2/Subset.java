
 
class Subset {
 
    /* Return true si Tab2 [] est un sous-ensemble de Tab1 [] */
    static boolean isSubset(int Tab1[], int Tab2[], int m, int n)
    {
        int i = 0;
        int j = 0;
        for (i = 0; i < n; i++)
        {   for (j = 0; j < m; j++)
            {    if(Tab2[i] == Tab1[j])
                    break;
            }             
            if (j == m)
                return false;
        }
        return true;
    }
     
    
    public static void main(String args[])
    {
        int T1[] = {5, 11, 12, 1, 10, 3, 7};
        int T2[] = {12, 1, 10};
         
        int m = T1.length;
        int n = T2.length;
     
        if(isSubset(T1, T2, m, n))
            System.out.print("Tab2 [] est un sous-ensemble de Tab1 [] ");
        else
            System.out.print("Tab2 [] n'est pas un sous-ensemble de Tab1 []"); 
    }
}
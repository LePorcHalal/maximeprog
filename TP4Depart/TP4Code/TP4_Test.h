///////////////////////////////////////////////////////////
//  TP4_Test.h
//  Implementation of the Class TP4_Test
//  Created on:      29-oct.-2018 09:22:46
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_123781D1_39B6_4d76_9F2B_B04DFBF2D76A__INCLUDED_)
#define EA_123781D1_39B6_4d76_9F2B_B04DFBF2D76A__INCLUDED_

#include "Objet3DComposite.h"
#include "TransformedObjet3D.h"

class TP4_Test
{
public:
	enum RESULTAT { SUCCES, ECHEC };
	TP4_Test();
	virtual ~TP4_Test();

	RESULTAT testComposite();
	RESULTAT testDecorator();

private:
	Objet3DComposite m_icone3D;
	TransformedObjet3D m_cylTransformed;
};
#endif // !defined(EA_123781D1_39B6_4d76_9F2B_B04DFBF2D76A__INCLUDED_)
